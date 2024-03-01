const divisionSelect = document.getElementById('divisions');
const districtSelect = document.getElementById('districts');
async function fetchDivisions() {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/divisions/');
      const data = await response.json();

      // Populate division select with options
      data.forEach(division => {
        const option = document.createElement('option');
        option.value = division.id;
        option.text = division.name;
        divisionSelect.appendChild(option);
      });

      // Trigger change event on division select to populate districts initially
      divisionSelect.dispatchEvent(new Event('change'));
    } catch (error) {
      console.error('Error fetching divisions:', error);
    }
  }

  // Function to fetch districts based on selected division
  async function fetchDistricts(divisionId) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/district/?division=${divisionId}`);
      const data = await response.json();

      // Clear previous options
      districtSelect.innerHTML = '';

      // Add new options based on API response
      data.forEach(district => {
        const option = document.createElement('option');
        option.value = district.id;
        option.text = district.name;
        districtSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }

  // Event listener for division select change
  divisionSelect.addEventListener('change', function() {
    const divisionId = divisionSelect.value;
    fetchDistricts(divisionId);
  });

  // Fetch divisions when the page loads
  fetchDivisions();


const handleForm=()=>{
    console.log(document.getElementById('phoneNumber').value);

    const formData=new FormData();
    formData.append('email', document.getElementById("email").value);
    formData.append('firstName', document.getElementById('firstName').value);
    formData.append('lastName', document.getElementById('lastName').value);
    formData.append('birthdayDate', document.getElementById('birthdayDate').value);
    formData.append('phone', document.getElementById('phoneNumber').value);
    formData.append('divisions', document.getElementById('divisions').value);
    formData.append('districts', document.getElementById('districts').value);
    formData.append('bloodGroup', document.getElementById('blood_group').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('confirm_password', document.getElementById('password2').value);
    formData.append('gender',  document.querySelector('input[name="gender"]:checked').value);
    formData.append('image', document.getElementById('image').files[0]);


    // const info={
    //   email:email,
    //   first_name:firstName,
    //   last_name:lastName,
    //   birth_date:birthdayDate,
    //   phone:phone,
    //   division:divisions,
    //   District:districts,
    //   blood_group:bloodGroup,
    //   gender: gender,
    //   password:password,
    //   confirm_password:confirm_password,
    //   image:image,
    // }
    // console.log(info);

    fetch("http://127.0.0.1:8000/user/list/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
    //   alert('send request successfully!');
        // window.location.href = 'index.html';
       console.log(data);
    });
}

// "first_name": "amina",
//             "last_name": "khatun",
//             "gender": "female",
//             "birth_date": "2024-01-28",
//             "email": "ninbd2d2@gmail.com",
//             "phone": "0176500160",
//             "blood_group": "1",
//             "image": "http://127.0.0.1:8000/media/images/female_avater.png",
//             "last_donate": "2024-02-07",
//             "availabilities": true,
//             "division": 1,
//             "District": 1





// const email=document.getElementById("email").value
//     const firstName=document.getElementById("firstName").value;
//     const lastName=document.getElementById("lastName").value;
//     const birthdayDate=document.getElementById("birthdayDate").value
//     const phone=document.getElementById("phoneNumber").value
//     const divisions=document.getElementById("divisions").value
//     const districts=document.getElementById("districts").value
//     const bloodGroup=document.getElementById("blood_group").value
//     const gender = document.querySelector('input[name="gender"]:checked').value;
//     const password=document.getElementById("password").value
//     const confirm_password=document.getElementById("password2").value
//     const image=document.getElementById("image").file