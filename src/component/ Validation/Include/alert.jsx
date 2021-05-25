
import {Alert, Button} from "react-bootstrap";

export const AlertDismissible = (props) => {
const closeAlert = () =>{
    props.setShow(false)
    localStorage.removeItem("persistantState");
}
    return (
        <>
            <Alert show={props.show} variant="warning">
                <Alert.Heading>{props.error}!</Alert.Heading>
                <div className="d-flex justify-content-end">
                    <Button onClick={closeAlert} variant="outline-success">
                        Close!
                    </Button>
                </div>
            </Alert>


        </>
    );
}

