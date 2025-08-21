import Rs from '../../public/images/forAboutUs/rs.svg?react';
function About() {
  return (
    <div className="max-w-[1440px] w-full flex flex-col items-center justify-center py-10 xl:px-40 sm:px-8">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-10">About Us</h1>
        <div
          className="flex flex-row-reverse items-center bg-center bg-cover"
          style={{
            backgroundImage:
              "url('../images/forAboutUs/aboutProjectBackground.png')",
          }}
        >
          <div className="w-1/2 bg-white flex flex-col">
            <h2 className="text-xl text-black text-center py-8">
              About Project
            </h2>
            <p className="text-ml text-black px-5 font-extralight tracking-wide text-justify">
              This project was developed as part of the JavaScript/Front-end
              2024 course at Rolling Scope School. It is a Single Page
              Application (SPA) powered by CommerceTools. The technology stack
              used to build this online store includes: React, TypeScript, Vite,
              TailwindCSS, Zustand, and Zod. This final project is the result of
              the coordinated team effort of the following team members:
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col items-center sm:flex-row-reverse w-full justify-between mt-10">
          <div
            className="w-1/2 h-80 bg-center bg-cover bg-position-[center_top_-45px] sm:w-1/3"
            style={{
              backgroundImage: "url('../images/forAboutUs/belifegor.jpg')",
            }}
          ></div>
          <div className="w-2/3 py-5">
            <h2 className="text-xl text-black text-center">
              Alexandr Cebotari
            </h2>
            <p className="font-extralight text-center py-2">
              <b>Role: </b> team-lead
            </p>
            <p className="text-ml text-black px-5 font-extralight tracking-wide text-justify">
              Alexander is a junior front-end developer passionate about
              learning modern technologies. During the final project, he took on
              the role of team leader and worked to ensure smooth and
              coordinated teamwork. In his work, he strives for clarity,
              structure, and respectful communication.
            </p>
            <p className="font-extralight text-center py-2">
              <b>GitHub: </b>
              <a href="https://github.com/Belifegor"> Belifegor</a>
            </p>
            <p className="font-extralight text-center py-2">
              <b>Contribution to the project: </b> project configuration, home
              page, cart page, navigation in catalog{' '}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center sm:flex-row w-full justify-between mt-10">
          <div
            className="w-1/2 h-80 bg-center bg-cover sm:w-1/3"
            style={{
              backgroundImage: "url('../images/forAboutUs/alex.jpeg')",
            }}
          ></div>
          <div className="w-2/3 py-5">
            <h2 className="text-xl text-black text-center">
              Aleksandr Kleshchev
            </h2>
            <p className="font-extralight text-center py-2">
              <b>Role: </b> developer
            </p>
            <p className="text-ml text-black px-5 font-extralight tracking-wide text-justify">
              Alex is a curious and open-minded person who enjoys working on
              meaningful projects and learning along the way. With a background
              in education and a deep curiosity for technology, he enjoys
              turning ideas into real solutions and helping others along the
              way. He believes in teamwork, growth, and creating things that
              bring value to others.
            </p>
            <p className="font-extralight text-center py-2">
              <b>GitHub: </b>
              <a href="https://github.com/AleksandrKlesh"> AleksandrKlesh</a>
            </p>
            <p className="font-extralight text-center py-2">
              <b>Contribution to the project: </b> API client in CommerceTools,
              product card, 404 pade, registration page, routing
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center sm:flex-row-reverse w-full justify-between mt-10">
          <div
            className="w-1/2 h-80 bg-center bg-cover bg-position-[center_top_-45px] sm:w-1/3"
            style={{
              backgroundImage: "url('../images/forAboutUs/kate.jpg')",
            }}
          ></div>
          <div className="w-2/3 py-5">
            <h2 className="text-xl text-black text-center">
              Ekaterina Naumenko
            </h2>
            <p className="font-extralight text-center py-2">
              <b>Role: </b> developer
            </p>
            <p className="text-ml text-black px-5 font-extralight tracking-wide text-justify">
              Ekaterina is a junior developer with a keen eye for detail and a
              strong desire to grow through hands-on practice. She believes that
              the path to mastery begins with perseverance and patience.
            </p>
            <p className="font-extralight text-center py-2">
              <b>GitHub: </b>
              <a href="https://github.com/kateNEO"> kateNEO</a>
            </p>
            <p className="font-extralight text-center py-2">
              <b>Contribution to the project:</b>login page, profile page, about
              us page, validation
            </p>
          </div>
        </div>
      </div>
      <p className="mt-10">
        We express our gratitude to{' '}
        <a href="https://rs.school/">
          <Rs className="w-10 inline-block" />
        </a>{' '}
        for the opportunity to learn and prove ourselves!
      </p>
    </div>
  );
}

export default About;
