import openai
import gym
from typing import Tuple
import re
import os


import json
import toml
import promptlayer


from llm_utils import (
   process
   ,tools
   ,validators
)

if 'secrets' in os.listdir('../'):
    secrets = toml.load('../secrets.toml')

promptlayer.api_key = secrets['promptlayer']['api_key']

OpenAI = promptlayer.openai.OpenAI

client = OpenAI(api_key = secrets['openai']['api_key'] )
os.environ['OPENAI_API_KEY'] = secrets['openai']['api_key'] )

import json
loan_process = json.loads('static/loan_process.json')


class LLMAgent():
   def __init__(self, loan_process:dict):
      self.loan_process = loan_process
      self.current_step = process.get_current_step(loan_process)
      self.step_done = False
      self.user_input = None


    def run(self, user_input):
        while not step_done:
            # Get user input
            if not user_input:
            user_input =  ''

            print(f'You responded with: {user_input}')
            print(process.current_step)

            information_needed = process.get_required_information(process.loan_process , process.current_step)

            print('************************* PLANNER **********************************')

            input_variables = {
                "current_task":loan_process[process.current_step]['name'], 
                'previous_query' : executor_response,
                "customer_response": user_input,
                "information" : information_needed
            }

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
                executor_response = tools.ask(**tool_calls.arguments)

                print(f'Agent Ask: {executor_response}')
                user_input = input('Please answer:')

                if parsers[information_needed](user_input) == True:
                    loan_process[current_step]['information_needed'][information_needed] = user_input



                elif tool_calls.name == 'respond':
                if type(tool_calls.arguments) == str:
                    tool_calls.arguments = eval(tool_calls.arguments)

                executor_response = tools.respond(**tool_calls.arguments)

                print(f'Agent Respond: {executor_response}')
                user_input = input('Please answer:')

                elif tool_calls.name == 'qa_tool':
                if type(tool_calls.arguments) == str:
                    tool_calls.arguments = eval(tool_calls.arguments)

                executor_response = tools.qa_tool(**tool_calls.arguments)
                print(f'Agent HDFC Answer: {executor_response}')
                user_input = input('Please answer:')

                step_done = check_if_step_completed(loan_process , current_step)

            if response.choices[0].message.content == 'Stop':
                step_done = True

