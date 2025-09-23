import "./style.module.css";

export default function InputModel(props) {
    return (
        <>
            <label htmlFor="inpContent">{props.content}</label>
            <input type="text" id="inpContent" />
        </>
    );
}