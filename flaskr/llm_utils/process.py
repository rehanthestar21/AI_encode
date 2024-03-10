

def get_current_step(loan_process:dict):
  ''' Function to read the dict and get the current stage '''
  for k,v  in loan_process.items():
    if v['stage'] == 'pending':
      return k



def check_if_step_completed(loan_process , step):
  ''' Function to read the dict and check if the current stage is done'''
  for k,v in loan_process[step]['information_needed'].items():
      if v == '':
        return False
  return True



def get_required_information(loan_process , step):
  '''Function to list out the information requried'''

  info_dict = loan_process[step]['information_needed']

  # infor_needed = ''
  for i,k in enumerate(info_dict):
    if info_dict[k] == '':
      return  k
