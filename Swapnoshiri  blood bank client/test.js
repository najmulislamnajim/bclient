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