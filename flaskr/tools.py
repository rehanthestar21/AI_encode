
from openai import OpenAI
client = OpenAI()


def ask(question):
  ''' Function to geneata question'''
  input_message = [
      {"role": "user"
      , "content": f"""You job is to rephrase the question to make it more friendly
              Question:  {question}

              Rephrased Question: """
      }
    ]
    # Generate the chain of thought reasoning and solution
  response = client.chat.completions.create(
      model="gpt-3.5-turbo"
      ,messages= input_message
    ,temperature = 0
    )
  return response.choices[0].message.content


def respond(answer):
  ''' Function to geneata question'''
  input_message = [
      {"role": "user"
      , "content": f"""You job is to rephrase the answer to make it more friendly
              Answer:  {answer}

              Rephrased Answer: """
      }
    ]
    # Generate the chain of thought reasoning and solution
  response = client.chat.completions.create(
      model="gpt-3.5-turbo"

      ,messages= input_message
    ,temperature = 0
    )
  return response.choices[0].message.content



def qa_tool(query):
  ''' Function to geneata question'''
  import requests
  rag_url = "https://matsudqa-d5d676aa588f.herokuapp.com/api/search"

  r = requests.get(url = rag_url, params = {'q' : query})
                    # extracting data in json format
  context = r.json()['result']

  metaprompt = f"""
      Answer the following question using the provided context and the information that the user has provided so far. 
      If you can't find the answer, do not pretend you know it, but answer "I don't know".

      Question: {query.strip()}

      Context: 
      {context.strip()}

      Answer:
      """
  messages_with_metaprompt = [
        {"role": "user", "content": metaprompt}
    ]
 
    # Generate the chain of thought reasoning and solution
  response = client.chat.completions.create(
      model="gpt-3.5-turbo"
      ,messages= messages_with_metaprompt
    ,temperature = 0
    )
  return response.choices[0].message.content
