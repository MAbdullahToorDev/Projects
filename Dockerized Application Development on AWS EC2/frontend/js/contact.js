document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("contactForm"); if(!form)return;
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    const status=document.getElementById("contactStatus");
    try{const data=Object.fromEntries(new FormData(form).entries()); await apiPost("/contact",data); status.textContent="Message sent successfully."; form.reset();}
    catch(err){status.textContent="Could not send message. Make sure the backend is running.";}
  });
});