import React from "react";
import {AppProps} from "next/app";
import {useRouter} from "next/router";
import {ChakraProvider, Stack, Image, Input, IconButton} from "@chakra-ui/react";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push(`/?q=${event.target["query"].value}`);
  }

  return (
    <ChakraProvider>
      <Stack backgroundColor="gray.50" height="100%" minHeight="100vh">
        <Stack backgroundColor="yellow.400" direction="row" padding={4} spacing={6}>
          <Image src="/logo.png" />
          <form style={{width: "100%"}} onSubmit={handleSubmit}>
            <Stack direction="row" spacing={0} width="100%">
              <Input backgroundColor="white" name="query" roundedRight={0} />
              <IconButton
                aria-label="Search database"
                icon={<img src="https://icongr.am/feather/search.svg?size=20&color=#666" />}
                roundedLeft={0}
              />
            </Stack>
          </form>
        </Stack>
        <Component {...pageProps} />
      </Stack>
    </ChakraProvider>
  );
};

export default App;
