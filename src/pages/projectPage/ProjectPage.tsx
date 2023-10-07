import React from "react";
import "./projectPage.sass";
import { Helmet } from "react-helmet";

export default function ProjectPage() {
  return (
    <div className="project-page-wrapper">
      <Helmet>
        <title>Project Page</title>
        <meta name="description" content="Описание страницы" />
      </Helmet>
      ProjectPage
    </div>
  );
}
