import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Button, Container, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { Greeting } from './Greeting';
import { CreateGreeting } from "./CreateGreeting";

function App() {
  const currentAccount = useCurrentAccount();
  const [greetingId, setGreeting] = useState(() => {
    const hash = window.location.hash.slice(1);
    return isValidSuiObjectId(hash) ? hash : null;
  });

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        align={"center"}
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>dApp Starter Template</Heading>
        </Box>

        <Box style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {currentAccount && (
            <Button
              variant="soft"
              onClick={() => {
                window.open(`https://faucet.sui.io/?address=${currentAccount.address}`, '_blank');
              }}
            >
              Get Testnet SUI
            </Button>
          )}
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          {currentAccount ? (
            greetingId ? (
              <Greeting id={greetingId} />
            ) : (
              <CreateGreeting
                onCreated={(id) => {
                  window.location.hash = id;
                  setGreeting(id);
                }}
              />
            )
          ) : (
            <Heading>Please connect your wallet</Heading>
          )}
        </Container>
      </Container>
    </>
  );
}

export default App;