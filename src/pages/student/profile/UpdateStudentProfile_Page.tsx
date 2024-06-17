import React, { useState } from 'react';

interface User {
  email: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  city: string;
  district: string;
  ward: string;
  street: string;
}

const UpdateStudentProfilePage = () => {
  const [user, setUser] = useState<User>({
    email: '',
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    gender: 'male',
    city: '',
    district: '',
    ward: '',
    street: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-5">Thông tin tài khoản</h2>
      <form className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
            Họ và tên
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dateOfBirth">
            Ngày sinh
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={user.gender === 'male'}
              onChange={handleChange}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="male" className="ml-2 block text-sm font-medium text-gray-700">
              Nam
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={user.gender === 'female'}
              onChange={handleChange}
              className="ml-4 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="female" className="ml-2 block text-sm font-medium text-gray-700">
              Nữ
            </label>
          </div>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
            Tỉnh/thành
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={user.city}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="district">
            Quận/huyện
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={user.district}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ward">
            Phường/xã
          </label>
          <input
            type="text"
            id="ward"
            name="ward"
            value={user.ward}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="street">
            Đường, phố, số nhà
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={user.street}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudentProfilePage;
