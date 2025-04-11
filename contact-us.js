// For Office locations ni
    const offices = [
      {
        city: "San Francisco, CA",
        email: "sf@spendsense.com",
        street: "545 Hayes St, San Francisco,",
        zip: "CA 94102",
        image: "/image/call.jpg"
      },
      {
        city: "New York, NY",
        email: "nyc@spendsense.com",
        street: "350 5th Avenue, New York,",
        zip: "NY 10118",
        image: "/image/calling.png"
      },
      {
        city: "Chicago, IL",
        email: "chicago@spendsense.com",
        street: "233 S Wacker Dr, Chicago,",
        zip: "IL 60606",
        image: "/image/collab.png"
      },
      {
        city: "Austin, TX",
        email: "austin@spendsense.com",
        street: "506 Congress Ave, Austin,",
        zip: "TX 78701",
        image: "/image/ny.png"
      }
    ];
    
    // just getting the Elements from ID
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const officeCity = document.getElementById('officeCity');
    const officeEmail = document.getElementById('officeEmail');
    const officeStreet = document.getElementById('officeStreet');
    const officeZip = document.getElementById('officeZip');
    const officeImage = document.getElementById('officeImage');
    
    // Current office index
    let currentOffice = 0;
    
    // para update office information
    function updateOfficeInfo() {
      const office = offices[currentOffice];
      
      // pang simple fade effect sa ika click
      officeCity.style.opacity = 0;
      officeEmail.style.opacity = 0;
      officeStreet.style.opacity = 0;
      officeZip.style.opacity = 0;
      officeImage.style.opacity = 0;
      
      setTimeout(() => {
        officeCity.textContent = office.city;
        officeEmail.textContent = office.email;
        officeStreet.textContent = office.street;
        officeZip.textContent = office.zip;
        officeImage.src = office.image;
        
        // Fade in ika click
        officeCity.style.opacity = 1;
        officeEmail.style.opacity = 1;
        officeStreet.style.opacity = 1;
        officeZip.style.opacity = 1;
        officeImage.style.opacity = 0.8;
      }, 300);
    }
    
    // prev button click
    prevBtn.addEventListener('click', () => {
      // giapply active state animation
      prevBtn.classList.add('active');
      setTimeout(() => prevBtn.classList.remove('active'), 200);
      
      // balik sa prev office ika click
      currentOffice--;
      if (currentOffice < 0) {
        currentOffice = offices.length - 1;
      }
      updateOfficeInfo();
    });
    
    // for next button click lang ni
    nextBtn.addEventListener('click', () => {
      // apply active state animation ulet
      nextBtn.classList.add('active');
      setTimeout(() => nextBtn.classList.remove('active'), 200);
      
      // go to next office
      currentOffice++;
      if (currentOffice >= offices.length) {
        currentOffice = 0;
      }
      updateOfficeInfo();
    });
    
    // pang form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
    
    // pang add transition styles
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        #officeCity, #officeEmail, #officeStreet, #officeZip, #officeImage {
          transition: opacity 0.3s ease;
        }
      </style>
    `);
 
