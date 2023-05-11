import { useAppDispatch, useAppSelector } from "@hooks/redux_hooks";
import { Alert, Snackbar } from "@mui/material";
import { removeAlertFromQueue } from "@stores/ui_store/ui_store";

const SnackbarAlert = () => {
	const dispatch = useAppDispatch();
	const { alertMessageQueue } = useAppSelector((state) => state.uiStore);

	const handleClose = () => {
		dispatch(removeAlertFromQueue());
	};

	return (
		<div>
			<Snackbar
				open={!!alertMessageQueue.length}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={alertMessageQueue[0]?.severity}>
					{alertMessageQueue[0]?.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export { SnackbarAlert };
