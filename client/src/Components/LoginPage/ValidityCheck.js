function isValidNUEmail(email) {
    const allowedDomains = ['lhr.nu.edu.pk', 'khi.nu.edu.pk', 'isl.nu.edu.pk'];
    const emailParts = email.split('@');
    const domain = emailParts[emailParts.length - 1];
    if (allowedDomains.includes(domain)) {
      return true;
    } else {
      return false;
    }
  }


export const EmailCheck =(email)=>{
    const regex = /^([a-zA-Z])(\d{2})(\d{4})@lhr\.nu\.edu\.pk$/;
    const match = email.match(regex);
    if (match) {
        return 1;
      } else {
        return isValidNUEmail(email);
    }      
}


function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 30; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


export const RollExtract =(email)=>{

    const regex = /^([a-zA-Z])(\d{2})(\d{4})@lhr\.nu\.edu\.pk$/;
    const match = email.match(regex);
    if (match) {
        const extractedString = `${match[2]}${match[1].toUpperCase()}-${match[3]}`;
        return extractedString;
      } 
    else
      return email +  generateRandomString();
}


export const PhoneCheck =(phone)=>{
    const regex = /^03\d{9}$/; // regular expression to match number starting with 03 and containing 11 digits
    return regex.test(phone); // test if the phone number matches the regular expression

}

export const PasswordCheck =(Password,ConfirmPassword)=>{
    if(Password==ConfirmPassword) return 1; else return 0;

}

export const DegreeCheck =(Degree)=>{
   
   return 1;

}

