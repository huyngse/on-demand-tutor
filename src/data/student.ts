// Student.ts

interface Address {
    City: string;
    District: string;
    Ward: string;
    Street: string;
}

interface Student {
    name: string;
    email: string;
    birthDate: string; 
    gender: string;
    phoneNumber: string;
    address: Address;
}

// Example data
const student: Student = {
    name: "Nguyễn Văn C",
    email: "nguyenvanc@example.com",
    birthDate: "2000-01-01",
    gender: "Male",
    phoneNumber: "0123456789",
    address: {
        City: "Hanoi",
        District: "Ba Dinh",
        Ward: "Phuc Xa",
        Street: "123 Example Street"
    }
};

console.log(student);
