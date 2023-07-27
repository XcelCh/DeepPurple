import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function EmployeeRecordingList() {
    const { id } = useParams();
  return (
      <p>{id}</p>
  );
}

export default EmployeeRecordingList;
