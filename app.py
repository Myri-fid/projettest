from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__, template_folder="templates", static_folder="static")

BODACC_API_URL = "https://bodacc-datadila.opendatasoft.com/api/records/1.0/search/?dataset=annonces-commerciales&q="

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/bodacc")
def get_bodacc_data():
    query = request.args.get("q", "")
    url = f"https://bodacc-datadila.opendatasoft.com/api/records/1.0/search/?dataset=annonces-commerciales&q={query}"

    try:
        response = requests.get(url)
        data = response.json()

        print("Données API reçues :", data)

        if "records" not in data or len(data["records"]) == 0:
            return jsonify({"error": "Aucun résultat trouvé."})

        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
