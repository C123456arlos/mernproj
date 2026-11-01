/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'course-details-heading-small':['26px', '36px'],
        'course-details-heading-large': ['36px', '44px'],
        'home-heading-small': ['28px', '34px'],
        'home-heading-large': ['48px', '56px'],
        'default':['15px', '21px']
      },
      gridTemplateColumns: {
        // 'test':'repeat(auto-fill, minmax(200px,1fr))'
      //  'auto': 'repeat(auto-fill, minmax(300px,1fr))'
        // 'auto': 'grid-cols-[280px_minmax(0,1fr)]'
        // repeat(4, minmax(0, 1fr))
        // 'auto':'grid-cols-[repeat(auto-fit, 200px_minmax(100px,1fr)])'
        // 'test': 'repeat(auto-fill, minmax(0,0fr))'
        //  'auto': 'repeat(minmax(2000px, 1fr))'
        // 'test': 'repeat(auto-fill, minmax(200px, 1fr, 1fr))'
        // 'auto': 'repeat(100px, minmax(0, 1fr))'
        //  'auto': '200px minmax(900px, 1fr) 100px'
        // 'auto': 'repeat(auto-fit, minmax(100px, 1fr))'
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      spacing: {
       'section-height':'500px' 
      },
      maxWidth: {
        'course-card':'424px'
      },
      boxShadow: {
        'custom-card':'0px 4px 15px 2px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
}