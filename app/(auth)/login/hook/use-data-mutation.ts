
import React, { useState } from "react";

export const useDataMutation = () => {
  const [message, setMessage] = useState("");

  const onSubmit = () => {

  }

  return {message, setMessage, onSubmit};
};
