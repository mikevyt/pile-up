import { ConnectionActionType } from "./connectionTypes";
import { Dispatch } from "redux";
import { PeerConnection } from "../../helpers/peer";
import { message } from "antd";

export const changeConnectionInput = (id: string) => ({
  type: ConnectionActionType.CONNECTION_INPUT_CHANGE,
  id,
});

export const setLoading = (loading: boolean) => ({
  type: ConnectionActionType.CONNECTION_CONNECT_LOADING,
  loading,
});
export const addConnectionList = (id: string) => ({
  type: ConnectionActionType.CONNECTION_LIST_ADD,
  id,
});

export const removeConnectionList = (id: string) => ({
  type: ConnectionActionType.CONNECTION_LIST_REMOVE,
  id,
});

export const selectItem = (id: string) => ({
  type: ConnectionActionType.CONNECTION_ITEM_SELECT,
  id,
});

export const connectPeer: (
  id: string
) => (dispatch: Dispatch) => Promise<void> =
  (id: string) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await PeerConnection.connectPeer(id);
      PeerConnection.onConnectionDisconnected(id, () => {
        message.info("Connection closed: " + id);
        dispatch(removeConnectionList(id));
      });
      PeerConnection.onConnectionReceiveData(
        id,
        async (data, connectionMap) => {
          await dispatch(data);
        }
      );
      dispatch(addConnectionList(id));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err);
    }
  };
