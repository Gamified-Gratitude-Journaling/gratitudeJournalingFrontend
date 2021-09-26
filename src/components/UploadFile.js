import { gql, useApolloClient, useMutation } from '@apollo/client';

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export default function UploadFile() {
  /* uploadFileMutation converts files into the a multipart request that graphql-upload can process.
   * The converted file along with the approriate POST request-body is sent to the ApolloClient we recieved through ApolloProvider in ../index.js.
   * Then, the client sends a POST request to our backend with the appropriate data
   * Refer to https://github.com/jaydenseric/apollo-upload-client
   */
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  /* Equivalent to 
   * `const onChange = (event) => {
   *    const file = event.target.files[0]; 
   *    const validity = event.target.validity;
   *    // Rest of code
   *  }`
   */
  const onChange = ({
    target: {
      validity,
      files: [file], 
    },
  }) =>
    validity.valid &&
    uploadFileMutation({ variables: { file } }).then(() => {
      apolloClient.resetStore();
    });

  return <input type="file" required onChange={onChange} />;
}
