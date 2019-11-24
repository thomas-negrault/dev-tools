import React from "react";

export const Homepage = () => {
  return (
    <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <main role="main">
        <h1 className="py-4">A set of tools made for developers</h1>
        <p className="lead">
          I wanted to create a <b>React application</b> as a side project and I was
          tired of always searching on Google for tools like "base64 decoder",
          "uuid generator" and all that kind of little dev tools.
        </p>
        <p>
          My idea was to create a <b>single web app</b> that will always be open in my
          first browser tab.</p>
        <p> I wanted the design to be <b>clean and simple to use</b>, as a
          lot of tools websites have an old look and feel. I also wanted to have a
          result as quickly as possible because the goal of this project is to save time.
        </p>
        <p>
         If you want a new tool to be added, feel free to submit your idea to <a href="mailto:contact@devtools.best">contact@devtools.best</a>. I will do my best to add it !
        </p>
      </main>
    </div>
  );
};
