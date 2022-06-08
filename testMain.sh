function testFillForm(){
  echo > form.json
  node fillForm.js < ./test/testMainData/working_test_data.txt > /Dev/null
  diff form.json ./test/testMainData/exp_working_main.json
}

testFillForm
