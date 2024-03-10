import os

import json
import toml
import promptlayer


from . import (
   process
   ,tools
   ,validators
)


secrets = toml.load("flaskr/secrets.toml")

promptlayer.api_key = secrets['promptlayer']['api_key']
print(promptlayer.api_key)

OpenAI = promptlayer.openai.OpenAI

client = OpenAI()


import json
with open('flaskr/static/loan_process.json') as json_file:
    loan_process = json.load(json_file)


class LLMAgent():
    def __init__(self, loan_process:dict):
      self.loan_process = loan_process
      self.current_step = process.get_current_step(loan_process)
      self.step_done = False
      self.user_input = None
      self.executor_response =''


    def run(self, user_input):
        print(f'You responded with: {user_input}')

        print(self.current_step)

        information_needed = process.get_required_information(self.loan_process , self.current_step)

        print('************************* PLANNER **********************************')

        input_variables = {
            "current_task":self.loan_process[self.current_step]['name'], 
            'previous_query' : self.executor_response,
            "customer_response": user_input,
            "information" : information_needed
        }

        print(information_needed)

        print(input_variables)

        plan_prompt = promptlayer.templates.get("planner_llm",
        {
        "provider": "openai",
        "input_variables": input_variables
        })


        if 'tool_choice' in plan_prompt['llm_kwargs']:
            plan_prompt['llm_kwargs'].pop('tool_choice')
        # Generate the chain of thought reasoning and solution
        response = client.chat.completions.create(
            **plan_prompt['llm_kwargs']
            ,pl_tags=["cosine_planner_llm"]
        )
        step_from_llm = response.choices[0].message.content
        print(step_from_llm)

        print('************************* EXECUTOR **********************************')

        input_variables = {
                    "current_task":step_from_llm, 
                }

        doer_prompt = promptlayer.templates.get("doer_llm",
                {
                "provider": "openai",
                "input_variables": input_variables
                })
            
        response = client.chat.completions.create(
                **doer_prompt['llm_kwargs']
                ,pl_tags=["cosine_doer_llm"]
                )
        tool_calls = response.choices[0].message.tool_calls

        if tool_calls:
                tool_calls = response.choices[0].message.tool_calls[0].function

                if tool_calls.name == 'ask':
                    if type(tool_calls.arguments) == str:
                        tool_calls.arguments = eval(tool_calls.arguments)
                    self.executor_response = tools.ask(**tool_calls.arguments)


                    if validators.parsers[information_needed](user_input) == True:
                        self.loan_process[self.current_step]['information_needed'][information_needed] = user_input

                    self.current_step = process.get_current_step(self.loan_process)
                    print(f'Agent Ask: {self.executor_response}')
                    with open ("temploan.json", 'w') as f:
                        json.dump(self.loan_process, f)
                    return self.executor_response
                    
                    



                elif tool_calls.name == 'respond':
                    if type(tool_calls.arguments) == str:
                        tool_calls.arguments = eval(tool_calls.arguments)

                    self.executor_response = tools.respond(**tool_calls.arguments)

                    print(f'Agent Respond: {self.executor_response}')
                    return self.executor_response

                elif tool_calls.name == 'qa_tool':
                    if type(tool_calls.arguments) == str:
                        tool_calls.arguments = eval(tool_calls.arguments)

                    self.executor_response = tools.qa_tool(**tool_calls.arguments)
                    print(f'Agent HDFC Answer: {self.executor_response}')
                    return self.executor_response


        # if response.choices[0].message.content == 'Stop':
        #     step_done = True

