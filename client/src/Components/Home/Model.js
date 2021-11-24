import React, { useState } from "react";
import { Card, Modal, Image, Button, Header, Input } from "semantic-ui-react";

const Model = ({ image, name, type, id }) => {
  const url = " https://i.mdel.net/i/db/" + image;
  const [open, setOpen] = useState(false);
  const [username, setName] = useState("");
  return (
    <div style={{ marginLeft: "40%", marginTop: "5%" }}>
      <Card>
        <Image src={url} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>

          <Card.Description>{type}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button content="Visit profile" color="linkedin" />}
          >
            <Modal.Content>
              <Modal.Description>
                <Header>Who are you ?</Header>
                <Input
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="example john doe . . ."
                />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => setOpen(false)}>
                Nope
              </Button>
              <Button
                content="Continue"
                labelPosition="right"
                icon="checkmark"
                onClick={() =>
                  (window.location.href = `/models/${id}?username=${username}`)
                }
                positive
              />
            </Modal.Actions>
          </Modal>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Model;
