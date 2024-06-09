const mongoose=require("mongoose");
const bcrypt=require('bcrypt');

const applicantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile_no: {
        type: Number,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    education:[
        {
            instituteName:{
                type:String,
            },
            degree:{
                type:String,
            },
            passingYear:{
                type:String,
            }
        }
    ],
    skills:{
        type:[String]
    },
    projects:[
        {
            projectTitle:{
                type:String,
            },
            projectDescription:{
                type:String,
            },
            startingDate:{
                type:Date
            },
            completionDate:{
                type:Date
            }
        }
    ],
    resume:{
        type:String
    },
    profileVisibility:{
        type:String,
        enum:['private','public']
    }
});

applicantSchema.pre('save',async function(next){
    const user=this;

    if(!user.isModified('password'))
        return next();
    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);

        // hash password
        const hashedPassword=await bcrypt.hash(user.password,salt);
        user.password=hashedPassword;
        next();
    }catch(error){
        console.log(error);
    }
})

applicantSchema.methods.comparePassword=async function(candidatePassword){
    try{
        // console.log(candidatePassword)
        // console.log(this.username);
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        console.log(isMatch);
        return isMatch;
    }
    catch(error){
        throw error
    }
}

const Applicant=mongoose.model('Applicant',applicantSchema);

module.exports={Applicant};