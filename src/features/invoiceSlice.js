import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data.json";
import genearteID from "../utils/generateId";
import moment from "moment";
import getForwardDate from "../utils/forwardDate";


const today = moment().format("YYYY-MM-DD");

const invoiceSlice = createSlice({
  name: "invoices",

  initialState: {
    allInvoice: data.data,
    filteredInvoice: [],
    invoiceById: null,
  },

  reducers: {
    filterInvoice: (state, { payload }) => {
      const { allInvoice } = state;
      if (payload.status === "") {
        state.filteredInvoice = allInvoice;
      } else {
        const filteredData = allInvoice.filter((invoice) => {
          return invoice.status === payload.status;
        });
        state.filteredInvoice = filteredData;
      }
    },
    getInvoiceById: (state, { payload }) => {
      const { allInvoice } = state;
      const invoice = allInvoice.find((item) => item.id === payload.id);
      state.invoiceById = invoice;
    },
    deleteInvoice: (state, { payload }) => {
      const { allInvoice } = state;
      const index = allInvoice.findIndex(
        (invoice) => invoice.id === payload.id
      );
      if (index !== -1) {
        allInvoice.splice(index, 1);
      }
    },
    updateInvoiceStatus: (state, { payload }) => {
      const { id, status } = payload;
      const invoiceUpdate = state.allInvoice.find(
        (invoice) => invoice.id === id
      );
      if (invoiceUpdate) {
        invoiceUpdate.status = status;
      }
    },
    addInvoice: (state, { payload }) => {
      const {
        description,
        paymentTerms,
        clientName,
        clientEmail,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        item,
      } = payload;
      const finalData = {
        id: `${genearteID()}`,
        createdAt: today,
        paymentDue: getForwardDate(paymentTerms),
        description: description,
        paymentTerms: paymentTerms,
        clientName: clientName,
        clientEmail: clientEmail,
        status: "pending",
        senderAddress: {
          street: senderStreet,
          city: senderCity,
          postCode: senderPostCode,
          country: senderCountry,
        },
        clientAddress: {
          street: clientStreet,
          city: clientCity,
          postCode: clientPostCode,
          country: clientCountry,
        },
        items: item,
        total: item.reduce((acc, i) => {
          return acc + Number(i.total);
        }, 0),
      };
      state.allInvoice.push(finalData);
      console.log(finalData);
    },
    editInvoice: (state, { payload }) => {
        const { allInvoice } = state;
      const {
        description,
        paymentTerms,
        clientName,
        clientEmail,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        item,
        id,
      } = payload;

      const invoiceIndex = allInvoice.findIndex((invoice) => invoice.id === id);
      const edittedObject = {
        description: description,
        paymentTerms: paymentTerms,
        clientName: clientName,
        clientEmail: clientEmail,
        senderAddress: {
          street: senderStreet,
          city: senderCity,
          postCode: senderPostCode,
          country: senderCountry,
        },
        clientAddress: {
          street: clientStreet,
          city: clientCity,
          postCode: clientPostCode,
          country: clientCountry,
        },
        items: item,
        total: item.reduce((acc, i) => {
          return acc + Number(i.total);
        }, 0),
      };

      if (invoiceIndex !== -1) {
        allInvoice[invoiceIndex] = {
          ...allInvoice[invoiceIndex] ,
          ...edittedObject
        };
      }
    },
  },
});

export default invoiceSlice;