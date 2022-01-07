import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  return (
    <div className="container-fluid m-0">
      <div>
        <MyComponent />
      </div>
    </div>
  );
}

function MyComponent() {
  const [header, changeHeader] = useState("MyChatApp");
  const [developer, changeDev] = useState("by Radhesham_210940520068");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [bootstarp, changeBoot] = useState(
    "form-control my-2 h-50 fs-3 border border-radius:50% p-4"
  );
  const handleMessage = (e) => {
    changeBoot("form-control my-2 h-50 fs-3 border border-radius:50% p-4");
    setMessage(e.target.value);
  };

  const sendMessage1 = () => {
    if (message == "") {
      changeBoot("form-control my-2 h-50 fs-3 border-danger border-radius:50% p-4");
      return;
    }
    const newList = [message, ...list];
    setList(newList);
    setMessage("");
  };

  const sendMessage = async () => {
    if (message == "") {
      changeBoot("form-control my-2 h-50 border-danger border-radius:50% p-4");
      return;
    }
    const url = "http://localhost:4000/add-msg";
    const msg1 = { msg: message };
    await axios.post(url, msg1);
    const newList = [msg1, ...list];
    setList(newList);
    setMessage("");
  };

  const getMessage = async () => {
    const url = "http://localhost:4000/message";
    const res = await axios.get(url);
    const list = res.data;
    const newlist = [...list];
    setList(newlist);
  };

  useEffect(() => getMessage(), []);
  return (
    <div className="row w-100 h-100 ">
      <div className="row bg-dark text-light ">
        <div className="p-3">
          <span className="h1 m-2">{header}</span>
          <span>{developer}</span>
        </div>
      </div>
      <div className="h-50">
        <input
          className={bootstarp}
          type="text"
          name=""
          id=""
          placeholder="Lets Chat Here...."
          value={message}
          onChange={handleMessage}
        />
        <input
          className="form-control bg-secondary text-light  p-3 fs-3"
          type="button"
          value="SEND"
          onClick={sendMessage}
        />
      </div>
      <hr />
      {list.map((item, index) => (
        <div key={index} className="text-right bg-light my-2 border">
          {item.msg}
        </div>
      ))}
    </div>
  );
}
