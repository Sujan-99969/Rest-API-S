import express, { request, response } from "express";
import mongoose from "mongoose";
import customers from "./customers.js";
// import customer from "./customers.js";

const app = express();
app.use(express.json());

var Connection_string =
  "mongodb://127.0.0.1:27017/Thamizh?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4";

  function randomAuthKey() {
    let authkey = ""
    for (let i = 0; i < 7; i++) {
      authkey += Math.floor(Math.random() * 16)
    }
    return authkey;
  }

//   insert
// -------------
app.use("/createcustomer", async (request, response) => {
  var customerData = await customer.create({
    cid: 8,
    cname: "hemanth",
    email: "hemanth@gmail.com",
    dob: "20-19-1993",
    age: "23",
    salary: 70000,
    did: 8,
    designation: "tester",
    pincode: 294832,
    pancard: "cbipd9248948",
    mobilenumber: 9849229872,
    status: 0,
    authkey: "",
  });
  response.status(200).json(customerData);
});

// insertmanycustomers
// -----------------------

app.use("/insertmanycustomers", async (request, response) => {
  var customerData = await customers.insertMany([
    {
      cid: 9,
      cname: "harshan",
      email: "harshan@gmail.com",
      dob: "30-10-1992",
      age: "29",
      salary: 40000,
      did: 9,
      designation: "project Manager",
      pincode: 929892,
      pancard: "cbipd92489308",
      mobilenumber: 9948929382,
      status: 0,
      authkey: "",
    },
    {
      cid: 9,
      cname: "deepthi",
      email: "deepthi@gmail.com",
      dob: "19-01-1994",
      age: "27",
      salary: 60000,
      did: 10,
      designation: "client partner",
      pincode: 929392,
      pancard: "cbipd93i2489308",
      mobilenumber: 9998929382,
      status: 0,
      authkey: "",
    },
  ]);
  response.status(200).json(customerData);
});

// selectall

app.use("/alldata", async (request, response) => {
  var customerData = await customers.find();
  response.status(200).json(customerData);
});


// selectone

app.use("/gettingsingleledata", async (request, response) => {
  //   console.log(request);
  let data = await customer.find({
    cname: request.body.name, // have to pass cname
  });
  response.status(200).json(data);
});

// updateOne

app.use("/selonerec", async (request, response) => {
  const { name } = request.body
  try {
    let data = await customers.find({ cname: name })
    response.status(200).json(data)
  } catch {
    response.status(200).json("Not found")
  }
})

// updateMany or multi

app.use("/findandmodify", async (request, response) => {
  const { id } = request.body
  try {
    let data = await customers.findByIdAndUpdate(
      { _id: id },
      { $set: { age: 29, designation: "project Manager" } }
    )

    response.status(200).json(data)
  } catch {
    response.status(200).json("Not found")
  }
})

// deleteone

app.use("/deloneuser", async (request, response) => {
  const { key } = request.body
  try {
    let deloneuser = await customers.deleteOne({ authKey: key })
    let existuser = await customers.find()
    response.status(200).json("deletedUser", deloneuser)
    response.status(200).json("existuser", existuser)
  } catch {
    response.status(200).json("Not found")
  }
})

// login check

app.use("/login", async (request, response) => {
  const { name, password } = request.body
  try {
    let loggeduser = await customers.find({
      $and: [{ cname: name }, { password: password }],
    })

    if (loggeduser.length > 0) {
      let updateUser = await customers.updateOne(
        { cname: loggeduser[0].cname },
        {
          $set: { authKey: randomAuthKey() },
        }
      )
      console.log(updateUser)
    }
    response.status(200).json(loggeduser)
  } catch {
    response.status(200).json("Not found");
  }
})

// app.use("/resetpswd", async (request, response) => {
//   let data = await customer.updateOne(
//     { email: request.params.email },
//     { oldpassword: request.params.oldpassword},
//     {
//       $eq: [
//         {
//           password: request.body.password,
//           confirmpassword: request.body.confirmpassword,
//         },
//       ],
//       $set: [
//         {
//           newpassword: request.body.newpassword,
//         },
//       ],
//     }
//   );
//   if (data) {
//     response.status(200).json({ message: "password changed", status: -1 });
//   } else {
//     response.status(200).json({ message: "failed", status: 0 });
//   }
// });

// app.post("/reset",function(req,res){
//     customer.findByUsername(req.body.email).then(function(exixstdUser){
//     if (exixstdUser){
//         exixstdUser.setPassword(req.body.password, function(){
//             exixstdUser.save();
//             req.flash("success","password resetted");
//                 // res.redirect("/login");
//         });
//     } else {
//         req.flash("error","User doesnt exist");
//                 // res.redirect("/reset");
//     }
//     },function(err){
//         console.log(err);res.redirect("/");
//     });

//     });


// localhost port number setup

mongoose
  .connect(Connection_string)
  .then(() => {
    app.listen(3030, () => {
      console.log("running success");
    });
  })
  .catch((error) => {
    console.log(error);
  });
