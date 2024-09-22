import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    ngOnInit(){




       
    }

    ngAfterViewInit(){
      this.LoadAnimation();

        
    
    }

    LoadAnimation(){
  
      
        const now = new Date();

      // Extract the date, time, and day
      const options : any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = now.toLocaleDateString(undefined, options);


      // Combine date and time
      const dateTimeString = `${date}`;

      const dateTimeElement = document.getElementById('date_time');
      if (dateTimeElement) {
          dateTimeElement.innerText = dateTimeString;
      }    else {
      console.error("Element with ID 'dateTimeDisplay' not found.");
    }


    
      // Intro scroller
      var letters = document.querySelectorAll('.letter');
    
      let introTextColor = gsap.timeline({
        scrollTrigger:{
          trigger:".initial_view",
          start:"center center",
          end:"80% center",
          pin:true,
          scrub:5,
          toggleActions:'play reverse reverse stop',
          // markers:true,
          
            onUpdate: (self) => {
             
            letters.forEach((letter, index) => {
              
             
                  
                    // Calculate the progress of the ScrollTrigger
                    const progress = self.progress;
                    console.log(progress,index/(letters.length ));
                    // Check if the progress matches the index of the letter
                    if (progress > index / (letters.length )) {
                      // Add class to the letter
                      // letters.forEach(ele=>{
                      //   ele.classList.remove("letter_active")
                      // })
                      letter.classList.add("letter_active");
                    } else {
                      // Remove class from the letter
                      letter.classList.remove("letter_active");
                    }
                 
             
            });
          }
        
        }
      })


      let introLine = gsap.timeline({
        scrollTrigger:{
          trigger:'.initial_view',
          start:"55% center",
          end:"bottom center",
          scrub:2,
          toggleActions:'play reverse reverse stop',
          // markers:true,
         
        }
      })
      introLine.to('.bar',{scaleX:2,width:'40vw',textAlign:'center'})
      introLine.to('.initial_view_line',{width:'100%'})
   
      
      // My Name Scroller

      let nameletters = document.querySelectorAll(".name_letter")

      let mynameTl = gsap.timeline({
        scrollTrigger: {
          // markers:true,
          trigger: ".name_view",
          start: "top center",
          end:"bottom center",
          scrub: 4, // Smooth animation
          onUpdate: (self) => {
             
            nameletters.forEach((letter, index) => {
              
              // console.log(letter);
                  
                    // Calculate the progress of the ScrollTrigger
                    const progress = self.progress;
                    console.log(progress >= index );
                    // Check if the progress matches the index of the letter
                    if (progress > index / (nameletters.length )) {
                      // Add class to the letter
                      // nameletters.forEach(ele=>{
                      //   ele.classList.remove("letter_active")
                      // })
                      letter.classList.add("letter_active");
                    
                    } else {
                      // Remove class from the letter
                      letter.classList.remove("letter_active");
                    }
                 
             
            });
          }
        }
      })
      let nameWidth :any = document.querySelector('.intro')?.scrollWidth
      
      mynameTl.fromTo(".intro", {
        x: `${nameWidth/2}`, // Move text left by viewport width
        ease:"sine",
       
      },{
        x: `-${nameWidth/3}`,
        
      });
      mynameTl.to(".name_bottom_line",{width: '100%'})



      const content : any = document.getElementById('aboutContent');
      const words = content.innerText.split(' ');
      content.innerHTML = words.map((word:string) => `<span>${word} </span>`).join('');
      

      const spans = content.querySelectorAll('span');

      const abtTL = gsap.timeline({
        scrollTrigger: {
          trigger: '.about_container',
          scrub: 3, // Smooth animation
          start: "top 50%",
          end: "bottom 100%",     // Start animation when top of content hits 80% of viewport
          toggleActions: "play none none none"  // Play the animation once on scroll
        }
      })

      abtTL.fromTo('.about_title', {
        opacity: 0,
        y: -120 ,
      
      },{
        opacity: 1, y: 0
      })
      abtTL.fromTo(spans, 
        { opacity: 0, y: 20 },  // Initial state: invisible and slightly lower
        { 
          opacity: 1, y: 0, 
          stagger: 0.1,  // Adds delay between each word's animation
          duration: 0.5, 
          ease: "power2.out", 
         
        }
      );


      const skillsTL = gsap.timeline({
        scrollTrigger: {
          trigger: '.skills_container',
          scrub: 3, // Smooth animation
          start: "top 50%",
          end: "bottom 100%",     // Start animation when top of content hits 80% of viewport
          toggleActions: "play none none none"  // Play the animation once on scroll
        }
      })
      skillsTL.fromTo('.skills_title', {
        opacity: 0,
        y: -120 ,
      
      },{
        opacity: 1, y: 0
      })
      skillsTL.fromTo('.skill', 
        { opacity: 0, y: 20 },  // Initial state: invisible and slightly lower
        { 
          opacity: 1, y: 0, 
          stagger: 0.1,  // Adds delay between each word's animation
          duration: 0.5, 
          ease: "power2.out", 
         
        }
      );
      
      gsap.to(".marquee-content", {
        x: "-100%", // Move to the left out of view
        duration: 18, // Adjust the speed here
        repeat: -1, // Repeat indefinitely
        ease: "linear" ,
    });
    }
}
