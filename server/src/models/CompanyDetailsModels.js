const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const comapanyDetailsSchema=new mongoose.Schema({
    employer:{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    },
    comapanyName:{
        type:String
    },
    companyDescription:{
        type:String
    },
    numOfEmployees:{type:String},
    establishmentDate:{type:Date},
    location:{type:String},
    domainOfWork:{
        type:String,
    },
    images:{
        type:[String]
    },
    profileImage:{
        type:String
    },
    reviews:{
        type:[String]
    },
    benifits:{
        type:[String]
    },
    profileVisibility:{
        type:String,
        enum:['private','public']
    },
    jobs:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Applicant',
        }]
    }
});

comapanyDetailsSchema.pre('save',async function(next){
    const user=this;

    if(!user.isModified('employer.password'))
        return next();
    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);

        // hash password
        const hashedPassword=await bcrypt.hash(user.employer.password,salt);
        user.employer.password=hashedPassword;
        console.log(hashedPassword);
        next();
    }catch(error){
        console.log(error);
    }
})

comapanyDetailsSchema.methods.comparePassword=async function(candidatePassword){
    try{
        // console.log(candidatePassword)
        // console.log(this.employer.password);
        const isMatch=await bcrypt.compare(candidatePassword,this.employer.password);
        console.log(isMatch)
        return isMatch;
    }
    catch(error){
        throw error
    }
}

const CompanyDetails=mongoose.model('CompanyDetails',comapanyDetailsSchema);

module.exports=CompanyDetails;