const mongoose=require('mongoose');

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
        required:true
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

    if(!user.isModified(this.employer.password))
        return next();
    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);

        // hash password
        const hashedPassword=await bcrypt.hash(user.employer.password,salt);
        user.employer.password=hashedPassword;
        next();
    }catch(error){
        console.log(error);
    }
})

comapanyDetailsSchema.methods.comparePassword=async function(candidatePassword){
    try{
        // console.log(candidatePassword)
        // console.log(this.username);
        const isMatch=await bcrypt.compare(candidatePassword,this.employer.password);
        return isMatch;
    }
    catch(error){
        throw error
    }
}

const CompanyDetails=mongoose.model('CompanyDetails',comapanyDetailsSchema);

module.exports=CompanyDetails;