using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uyg05.ViewModel
{
    public class OdevModel
    {
        public string odevId { get; set; }
        public string odevDersId { get; set; }
        public string odevDersAdi{ get; set; }
        public string odevKonu { get; set; }

        public int odevOgrSayisi { get; set; }
    }
}