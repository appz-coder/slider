
import {Alert, Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {returnFetchPresentationStateAC} from "../../../redux/store/action_creator/sliderAC";

export const AlertDismissible = (props) => {
    const dispatch = useDispatch();
const closeAlert = () =>{
    props.setShow(false)
     // dispatch(returnFetchPresentationStateAC())
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

