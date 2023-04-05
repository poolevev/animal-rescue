class DonationManager {
    donationHistoryList = [];

    addDonationHistory = (sum, animal, date) => {

        let donationHistory = [];
        donationHistory.push(sum);
        donationHistory.push(animal);
        donationHistory.push(date);
        this.donationHistoryList.push(donationHistory);

    }


    createTableItem = (list, table) => {

        table.innerHTML = "";
        list.forEach(item => {
            let row = document.createElement("tr");
            let data1 = document.createElement("td");
            let data2 = document.createElement("td");
            let data3 = document.createElement("td");
            data1.innerText = item[2];
            data2.innerText = item[1];
            data3.innerText = item[0];
            row.append(data1, data2, data3);
            table.append(row);
        })

    }

}