import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useNetworkVariable } from "./networkConfig";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export function Greeting({ id }: { id: string }) {
  const helloWorldPackageId = useNetworkVariable("helloWorldPackageId");
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
    id,
    options: {
      showContent: true,
    },
  });

  const [newText, setNewText] = useState("");
  const [waitingForTxn, setWaitingForTxn] = useState(false);

  const executeMoveCall = () => {

    setWaitingForTxn(true);

    const tx = new Transaction();

    tx.moveCall({
      target: `${helloWorldPackageId}::greeting::update_text`,
      arguments: [tx.object(id), tx.pure.string(newText)]
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (tx) => {
          suiClient.waitForTransaction({ digest: tx.digest }).then(async () => {
            await refetch();
            setWaitingForTxn(false);
            setNewText("");
          });
        },
      },
    );
  };

  if (isPending) return <Text>Loading...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  if (!data.data) return <Text>Not found</Text>;

  return (
    <>
      <Heading size="3">Greeting {id}</Heading>

      <Flex direction="column" gap="2">
        <Text>Text: {getGreetingFields(data.data)?.text}</Text>
        <Flex direction="row" gap="2">
          <TextField.Root 
            placeholder={getGreetingFields(data.data)?.text}
            value={newText}
            onChange={(e) => {
              setNewText(e.target.value);
            }}
            disabled={waitingForTxn}
          />
          <Button
            onClick={() => executeMoveCall()}
            disabled={waitingForTxn}
          >
            {waitingForTxn? (
              <ClipLoader size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
function getGreetingFields(data: SuiObjectData) {
  if (data.content?.dataType !== "moveObject") {
    return null;
  }

  return data.content.fields as { text: string; };
}
