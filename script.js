<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  const app = initializeApp(firebaseConfig);


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

  const firebaseConfig = {
    apiKey: "AIzaSyBBKxluV8UXDqEm0r9-VcXqP_NdcEJL168",
    authDomain: "tablero-de-control-34c91.firebaseapp.com",
    projectId: "tablero-de-control-34c91",
    storageBucket: "tablero-de-control-34c91.firebasestorage.app",
    messagingSenderId: "564917807741",
    appId: "1:564917807741:web:6e0355ff9b833176dbdf14"
  };

  // Initialize Firebase

// Generate Table
const generateTableButton = document.getElementById("generateTable");
generateTableButton.addEventListener("click", () => {
    const numVendors = document.getElementById("numVendors").value;
    const tableHead = document.querySelector("#evaluationTable thead tr");
    const tableBody = document.querySelector("#evaluationTable tbody");

    // Clear previous columns
    tableHead.innerHTML = "<th>Specification</th>";
    tableBody.innerHTML = "";

    // Add vendor columns
    for (let i = 1; i <= numVendors; i++) {
        tableHead.innerHTML += `<th>Vendor ${i} Offer</th><th>Complies</th>`;
    }
});

// Add Specification Row
const addSpecificationButton = document.getElementById("addSpecification");
addSpecificationButton.addEventListener("click", () => {
    const tableBody = document.querySelector("#evaluationTable tbody");
    const numVendors = document.getElementById("numVendors").value;
    
    let row = document.createElement("tr");
    let specCell = document.createElement("td");
    let specInput = document.createElement("input");
    specInput.type = "text";
    specInput.classList.add("spec-input");
    specCell.appendChild(specInput);
    row.appendChild(specCell);
    
    for (let i = 1; i <= numVendors; i++) {
        let offerCell = document.createElement("td");
        let offerInput = document.createElement("input");
        offerInput.type = "text";
        offerInput.classList.add("vendor-offer");
        offerCell.appendChild(offerInput);
        row.appendChild(offerCell);
        
        let complianceCell = document.createElement("td");
        let complianceCheckbox = document.createElement("input");
        complianceCheckbox.type = "checkbox";
        complianceCheckbox.classList.add("compliance");
        complianceCell.appendChild(complianceCheckbox);
        row.appendChild(complianceCell);
    }
    
    tableBody.appendChild(row);
});

// Save Evaluation to Firestore
const saveEvaluationButton = document.getElementById("saveEvaluation");
saveEvaluationButton.addEventListener("click", () => {
    const clientName = document.getElementById("clientName").value;
    const projectName = document.getElementById("projectName").value;
    const itemName = document.getElementById("itemName").value;
    const recommendedVendor = document.getElementById("recommendedVendor").value;
    const rows = document.querySelectorAll("#evaluationTable tbody tr");

    let evaluationData = {
        clientName,
        projectName,
        itemName,
        recommendedVendor,
        vendors: [],
        specifications: []
    };

    rows.forEach(row => {
        let spec = row.querySelector(".spec-input").value;
        let vendorOffers = [];
        let complianceChecks = [];
        row.querySelectorAll(".vendor-offer").forEach(input => vendorOffers.push(input.value));
        row.querySelectorAll(".compliance").forEach(checkbox => complianceChecks.push(checkbox.checked));
        
        evaluationData.specifications.push({
            spec,
            vendorOffers,
            complianceChecks
        });
    });

    db.collection("evaluations").add(evaluationData).then(() => {
        alert("Evaluation saved successfully!");
    }).catch(error => {
        console.error("Error saving evaluation: ", error);
    });
});
</script>
