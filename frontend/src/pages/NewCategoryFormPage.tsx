import axios from "axios";

const NewCategoryFormPage = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.target;
        const formdata = new FormData(form as HTMLFormElement);

        const formJson = Object.fromEntries(formdata.entries());
        axios.post("http://localhost:3000/categorie", formJson);
      }}
    >
      <label>
        Titre de l'annonce :
        <br />
        <input className="text-field" type="text" name="name" />
      </label>
      <button className="button">Submit</button>
    </form>
  );
};
export default NewCategoryFormPage;
