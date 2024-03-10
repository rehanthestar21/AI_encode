import re

def is_valid_full_name(name):
    # Regular expression pattern for a valid full name
    pattern = r'^[a-zA-Z]+(?:\s[a-zA-Z]+)+$'

    # prompt = 'Is this a valid name? Answer True or False'
    # gpt_respone =  generate_openai_response(prompt).choices[0].message.content

    # Check if the name matches the pattern
    if re.match(pattern, name):
        return True
    else:
        return False

def is_valid_birthday(date):
    # Regular expression pattern for a valid birthday in the format "dd/mm/yyyy"
    pattern = r'^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$'

    # Check if the date matches the pattern
    if re.match(pattern, date):
        return True
    else:
        return False


def is_valid_address(address):
  return True


parsers = {
    'full_name' : is_valid_full_name
    ,'birthday' : is_valid_birthday
    ,'address' : is_valid_full_name
}
