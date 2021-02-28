import React, { useState, useEffect, useCallback, useMemo } from 'react'

const example = () => {
  const [name, setName] = useState("Rafael");
  const [options, setOptions] = useState(["1", "2", "3"]);

  useEffect(() => {
    console.log("primitive variable dependent effect");
  }, [name]);

  useEffect(() => {
    console.log("options array dependent effect");
  }, [options]);

  useMemo(() => options, []);

  return (
    <form>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  )
}

export default example;
