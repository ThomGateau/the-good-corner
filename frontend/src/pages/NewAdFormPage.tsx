const NewAdFormPage = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault();

      const form = e.target;
      const formdata = new FormData(form as HTMLFormElement);

      const formJson = Object.fromEntries(formdata.entries());
      console.log(formJson);
    }}
  >
    <label>
      Titre de l'annonce :
      <input className="text-field" type="text" name="title" />
    </label>
    <br />
    <label>
      Description :
      <input className="text-field" type="text" name="description" />
    </label>
    <br />
    <label>
      Owner :
      <input className="text-field" type="text" name="owner" />
    </label>
    <br />
    <label>
      Price :
      <input className="text-field" type="number" name="price" />
    </label>
    <br />
    <label>
      Picture :
      <input className="text-field" type="text" name="picture" />
    </label>
    <br />
    <label>
      Location :
      <input className="text-field" type="text" name="location" />
    </label>
    <br />
    <label>
      Date :
      <input className="text-field" type="date" name="createdAt" />
    </label>
    <button className="button">Submit</button>
  </form>
);
export default NewAdFormPage;
