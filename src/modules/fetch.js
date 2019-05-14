import Papa from 'papaparse'

export default function fetch_data() {
  Papa.parse("../static/data.csv", {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function(results) {
        return results.data
    }
  });
}
