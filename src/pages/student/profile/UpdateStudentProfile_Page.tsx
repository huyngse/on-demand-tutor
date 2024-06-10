import React, { useState, ChangeEvent, FormEvent } from 'react';
import './UpdateStudentProfilePage.css';

interface FormData {
  username: string;
  email: string;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  address: string;
}

const UpdateStudentProfilePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    address: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Call API to update student profile here
  };

  return (
    <div>
      <h2>Update Student Profile</h2>
      <form className="update-student-profile-form" onSubmit={handleSubmit}>
        <h2>Thông tin tài khoản</h2>
        <div className="form-row">
          <div className="form-column">
            <div className="form-group">
              <label>Tên đăng nhập *</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                placeholder="Tên đăng nhập" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Họ và tên</label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Họ và tên" 
              />
            </div>
            <div className="form-group">
              <label>Giới tính</label>
              <div>
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  checked={formData.gender === 'male'} 
                  onChange={handleChange} 
                /> Nam
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  checked={formData.gender === 'female'} 
                  onChange={handleChange} 
                /> Nữ
              </div>
            </div>
            <div className="form-group">
              <label>Tỉnh/thành</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                placeholder="Tỉnh/thành" 
              />
            </div>
            <div className="form-group">
              <label>Phường/xã</label>
              <input 
                type="text" 
                name="ward" 
                value={formData.ward} 
                onChange={handleChange} 
                placeholder="Phường/xã" 
              />
            </div>
          </div>
          <div className="form-column">
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Ngày sinh *</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Số điện thoại" 
              />
            </div>
            <div className="form-group">
              <label>Quận/huyện</label>
              <input 
                type="text" 
                name="district" 
                value={formData.district} 
                onChange={handleChange} 
                placeholder="Quận/huyện" 
              />
            </div>
            <div className="form-group">
              <label>Đường, phố, số nhà</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Đường, phố, số nhà" 
              />
            </div>
          </div>
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdateStudentProfilePage;
