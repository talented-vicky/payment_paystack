const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bp = require('body-parser')
const _ = require('lodash')

const app = express()

const paymentRouter = require('./routes/payment')

require('dotenv').config()
const mongodb_url = process.env.MONGO_URL
const port_no = process.env.PORT_NO


app.use(bp.json())
app.use(bp.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public/')))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(paymentRouter)

mongoose.connect(mongodb_url)
    .then(result => {
        app.listen(port_no || 3000, () => {
            console.log("connected to mongoDB")
        })
    })
    .catch(err => console.log(err))




    // string = "[{[([([({[]})])])}]"
    // string_list = list(string)
    // print(string_list)
    
    // countFor = 0
    // countBack = 0
    
    // for check in string_list:
    //     if check == '[' or check == '{' or check == '(':
    //         countFor += 1
    //     elif check == ']' or check == '}' or check == ')':
    //         countBack += 1
    //         got_ind = string_list.index(check)
    //         print(got_ind)
    //         prev_ind = (2 * countBack) -1
    //         print(string_list[got_ind], string_list[got_ind - prev_ind])
    //         if string_list[got_ind] == string_list[got_ind - prev_ind]:
    //             print('good to go')
    //         else:
    //             print('something wrong')
    
// path = input()
// subfolders = path.split(sep="/")
// subfolder_stack = []

// for name in subfolders:
//     if name == ".":
//         pass
//     elif name == "..":
//         if subfolder_stack:
//             subfolder_stack.pop()
//         else:
//             pass
//     elif name == "/":
//         pass
//     elif name == "":
//         pass
//     else:
//         subfolder_stack.append(name)

// result = "/"
// for i in range(0, len(subfolder_stack)):
//     result += subfolder_stack[i]
//     if i == len(subfolder_stack) - 1:
//         pass
//     else:
//         result += "/"

// return result

// s = input()  
// stack = [-1]
// ans = 0
// for i in range(len(s)):
//  if s[i] == "(":
//     stack.append(i)
//  else:
//     if stack and stack[-1]!=-1 and s[stack[-1]] == "(":
//        stack.pop()
//        ans = max(ans,i - stack[-1])
//     else:
//         stack.append(i)
// print(ans)