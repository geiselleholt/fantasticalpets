import { useState, useEffect } from "react";

export default function PetPage() {
  const [petImageUrl, setPetImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createPet = async function () {
    setIsLoading(true);

    try {
      // code snippet from DeepAI API
      const resp = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "00622549-0b6d-40f2-af3d-471d50dc8e9a",
        },
        body: JSON.stringify({
          text: "cartoon image of a cute kitten / mouse mix",
        }),
      });

      const data = await resp.json();
      console.log(data);

      setPetImageUrl(data.output_url);
    } catch (err) {
      console.error("Error creating pet:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    createPet();
  }, []);

  return (
    <>
      <h1>Pet Page</h1>
      {isLoading && <p>Generating your pet...</p>}
      {petImageUrl && (
        <div>
          <h2>Here's Your New Pet!</h2>
          <img
            src={petImageUrl}
            alt="AI-generated pet"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </>
  );
}
