import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../../center/postShare";

function ShareModal({ openModal, setOpenModal }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      size="40rem"
      overlayBlur={3}
      opened={openModal}
      onClose={() => setOpenModal(false)}
    >
      <PostShare />
    </Modal>
  );
}
export default ShareModal;
