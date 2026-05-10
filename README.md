# SHVA Transaction Approval Simulator

A full-stack transaction approval simulator built with React, ASP.NET Core Web API, Entity Framework Core, MSSQL, JWT Authentication, and Docker.

Developed as part of the SHVA Full-stack Developer interview task.

---

## Project Overview

The system simulates financial transaction approvals based on banking working hours across multiple regions worldwide.

Users can:

- Register and login securely
- Select a region
- Submit a UTC transaction time
- Simulate transaction approval or rejection
- View approved transactions
- Switch between English and Hebrew

The backend converts the submitted UTC time into the correct local time zone of the selected region and applies the business logic:

- Transactions are approved only during banking hours (08:00–18:00 local time)
- Transactions outside this time window are rejected

All transactions are persisted in MSSQL, while only approved transactions are displayed in the UI.

---

## Tech Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- MSSQL Server
- JWT Authentication

### Infrastructure

- Docker
- Docker Compose

---

## Features

- Transaction approval simulation
- Time zone conversion by region
- Approved / Rejected business logic
- JWT Authentication
- Register / Login / Logout
- MSSQL persistence
- Approved transactions retrieval
- Responsive UI implementation
- English / Hebrew localization
- RTL / LTR layout support
- Clean layered architecture
- Docker containerization

---

## Supported Regions

- Israel
- France
- USA
- Japan

---

# Backend Setup

## Navigate to the server project

```bash
cd server