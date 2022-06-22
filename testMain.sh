#! /bin/bash

function testFillForm(){
  echo > form.json
  
  node fillForm.js << EOF > /Dev/null
  Barnali
  1111-11-11
  drawing,coding
  1234567890
EOF

  diff form.json ./test/testMainData/exp_form.json
}

testFillForm
