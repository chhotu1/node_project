import User from '../models/user'
export default class UserController{
    model = User;
    
    addUser = (req,res)=>{
        console.log("welcome")
        if(!req.body.email){
            res.send({
                "Error":false,
                "Message": "Email is empty"
            });
            return;
        }
        this.model.findOne({email:req.body.email}).exec((err,user)=>{
            if(err){
                return console.log(err);
            }
            if(user){
                return res.json({Error:false,Message:'Email already exists, email: '+req.body.email});
            }
            else{
                const userObj = new User({
                    email: req.body.email,
                    password: req.body.password,
                    first_name: req.body.first_name,
                    username : req.body.username,
                    role : req.body.role,
                    dob : req.body.dob
                });
                console.log('data',userObj)
                userObj.save((err,userObj)=>{
                    if(err){
                        return console.error(err)
                    }
                    if(userObj){
                        return res.json({ success: true, message: userObj });
                    }
                })

            }

        });

        // this.model.findOne({ email: req.body.email })
        // .populate('user', '-password')
        // .exec((err, user) => {
        //     if (err) { return console.error(err); }
        //     if (user) {
        //         return res.json({
        //             'success': false,
        //             'message': 'User already exist with this email'
        //         })
        //     }
        //     else{
            //success
        
        //     }
        // });


    }
    // getAge('16-03-1989')


    getAllUser = (req,res)=>{
        this.model.find({},function(err,data){
            return res.json({success:true,data:data});

        });
    }

    deleteUserById = (req,res) =>{
        this.model.findOneAndRemove({_id:req.params.id},(err)=>{
            if(err){
                return res.status({error:false,message :'user Not deleted'})
            }
            res.status(200).json({success:true,message:'user delete'})

        });
    }

    getUserById = (req,res) => {
        this.model.findOne({_id:req.params.id}).exec((err,data)=>{
            if(err){
               return console.error(err)
            }
            if(data){
               return res.json({success:true,data:data});
            }
        });
    }




}