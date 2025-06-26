import { Payments } from "#models";

class PaymentRepository {
  static async create(paymentData) {
    return await Payments.create(paymentData);
  }

  static async findById(id) {
    return await Payments.findByPk(id);
  }

  static async findAllByStudent(studentId) {
    return await Payments.findAll({ where: { studentId } });
  }

  static async findByIntentId(paymentIntentId) {
    return await Payments.findOne({ where: { paymentIntentId } });
  }

  static async updateStatus(paymentIntentId, status) {
    return await Payments.update({ status }, { where: { paymentIntentId } });
  }
  
}

export default PaymentRepository;
