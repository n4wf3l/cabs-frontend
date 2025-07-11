import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import {
  DriverResponseDTO,
} from "@/api/models/DriverDTO";


// Obtenir la date actuelle au format DD-MM-YYYY
const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Styles PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    textAlign: "center",
    fontSize: 10,
    color: "#666", // Gris foncé pour un effet discret
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    alignSelf: "center",
  },
  table: {
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 8,
    fontSize: 12,
  },
  cellHeader: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

const PDFDocument = ({ drivers }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo */}
      <Image src="/tlogo.png" style={styles.logo} />

      {/* En-tête */}
      <Text style={styles.header}>Liste des chauffeurs</Text>
      <Text style={styles.dateText}>Document généré le {getCurrentDate()}</Text>

      {/* Tableau */}
      <View style={styles.table}>
        {/* En-tête du tableau */}
        <View style={styles.row}>
          <Text style={styles.cellHeader}>Nom</Text>
          <Text style={styles.cellHeader}>Email</Text>
          <Text style={styles.cellHeader}>Téléphone</Text>
          <Text style={styles.cellHeader}>Adresse</Text>
          <Text style={styles.cellHeader}>Statut</Text>
        </View>

        {/* Données des chauffeurs */}
        {drivers.map((driver: DriverResponseDTO, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>
              {driver.firstName} {driver.lastName}
            </Text>
            <Text style={styles.cell}>{driver.email}</Text>
            <Text style={styles.cell}>{driver.phoneNumber}</Text>
            <Text style={styles.cell}>
              {driver.address}, {driver.postalCode}
            </Text>
            <Text style={styles.cell}>
              {driver.onLeave ? "En congé" : "Actif"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
