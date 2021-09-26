import { gql, useQuery } from '@apollo/client';

const UPLOADS_QUERY = gql`
  query uploads {
    uploads {
      filename
    }
  }
`;

export default function Uploads() {
  const { data: { uploads = [] } = {} } = useQuery(UPLOADS_QUERY);

  return (
    <table>
      <thead>
        <tr>
          <th>Stored file name</th>
        </tr>
      </thead>
      <tbody>
        {uploads.map(({ filename }) => (
          <tr key={filename}>
            <td>{filename}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
