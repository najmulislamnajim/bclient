const loadBlog=()=>{
    fetch("https://sbb-2mjp.onrender.com/blog/")
    .then((res) =>res.json())
    .then((data) =>displayBlog(data))
    .catch((err) =>console.log(err));
};

const displayBlog=(data)=>{
    // console.log(data)
    data.forEach((data) =>{
        const parent=document.getElementById("blog-container")
        const div=document.createElement("div")
        div.classList.add("col-md-6")
        div.innerHTML=`
            <div class="news-card">
              <div class="image">
              <img src=${data.image} alt="blog-image">
              </div>
              <div class="detail">
                <h2 style="color: #de1f26">${data.title}</h2>
                <p>
                  ${data.blog}
                </p>
                <p class="footp">
                  27 Comments <span>/</span>
                  Read More
                </p>
              </div>
            </div>
        `;
        parent.appendChild(div);
    })
}

const loadDonor=()=>{
  fetch("http://127.0.0.1:8000/user/list/")
  .then((res) =>res.json())
  .then((data) =>displayDonor(data.results))
  .catch((err) =>console.log(err));
};

const displayDonor=(data)=>{
  // console.log(data)
  data.forEach((data) =>{
    const parent=document.getElementById("donorview")
    const div=document.createElement("div")
    div.classList.add("col-md-3")
    div.classList.add("col-sm-6")
    div.classList.add("vd")
    div.innerHTML=`
    <div class="bkjiu">
      <img src=${data.image} alt="Donor Image" class="my-image" style="border-radius:20px;"/>
      <h4>${data.first_name}  ${data.last_name}</h4>
      <h4>Blood Group:<span style="text-transform: uppercase;color:#de1f26;"> ${data.blood_group}</span></h4>
      <h4>Last Donation: ${data.last_donate_date}</h4>
      <button class="btn btn-sm btn-danger" ><a  href="request.html?donorId=${data.id}" style="color: #fff;">Request to Donate</a>
        
      </button>
      </div>
        `;
        parent.appendChild(div);
  })
}

const handleDonate=()=>{
  const param = new URLSearchParams(window.location.search).get("donorId");
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value
  const location=document.getElementById("location").value
  const phone=document.getElementById("phone").value
  const disease=document.getElementById("disease").value

  const info={
    name:name,
    email:email,
    location:location,
    phone:phone,
    disease:disease,
    donor:param,
    
  }

  // console.log(info)

  fetch("https://sbb-2mjp.onrender.com/donor/donation-request/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      alert('send request successfully!');
        window.location.href = 'index.html';
       console.log(data);
    });

}

const handleContact=()=>{
  const name=document.getElementById("contact_name").value;
  const phone=document.getElementById("contact_phone").value
  const email=document.getElementById("contact_email").value
  const message=document.getElementById("contact_message").value
  const info={
    name:name,
    email:email,
    phone:phone,
    message:message, 
  }

  fetch("https://sbb-2mjp.onrender.com/contact/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      alert('send message successfully!');
        window.location.href = 'index.html';
      //  console.log(data);
    });
}


loadBlog();
loadDonor();
